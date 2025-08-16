import { writable, derived } from 'svelte/store';
import { CalendarDate, getLocalTimeZone } from '@internationalized/date';

export interface BookingDetails {
	checkIn: CalendarDate | null;
	checkOut: CalendarDate | null;
	guests: number;
	guestName: string;
	guestEmail: string;
	guestPhone: string;
	specialRequests: string;
}

export interface PricingTier {
	name: string;
	multiplier: number;
	dates: string[];
}

interface BookingState {
	details: BookingDetails;
	basePricePerNight: number;
	pricingTiers: PricingTier[];
	isLoading: boolean;
	error: string | null;
}

const initialState: BookingState = {
	details: {
		checkIn: null,
		checkOut: null,
		guests: 2,
		guestName: '',
		guestEmail: '',
		guestPhone: '',
		specialRequests: ''
	},
	basePricePerNight: 150,
	pricingTiers: [
		{
			name: 'Peak Season',
			multiplier: 1.5,
			dates: ['2024-07-01', '2024-08-31', '2024-12-20', '2024-12-31']
		},
		{
			name: 'High Season',
			multiplier: 1.3,
			dates: ['2024-05-01', '2024-06-30', '2024-09-01', '2024-09-30']
		},
		{
			name: 'Weekend Premium',
			multiplier: 1.2,
			dates: []
		}
	],
	isLoading: false,
	error: null
};

function createBookingStore() {
	const { subscribe, set, update } = writable<BookingState>(initialState);

	return {
		subscribe,
		setCheckIn: (date: CalendarDate) => {
			update(state => ({
				...state,
				details: { ...state.details, checkIn: date }
			}));
		},
		setCheckOut: (date: CalendarDate) => {
			update(state => ({
				...state,
				details: { ...state.details, checkOut: date }
			}));
		},
		setGuests: (count: number) => {
			update(state => ({
				...state,
				details: { ...state.details, guests: count }
			}));
		},
		updateGuestDetails: (details: Partial<Pick<BookingDetails, 'guestName' | 'guestEmail' | 'guestPhone' | 'specialRequests'>>) => {
			update(state => ({
				...state,
				details: { ...state.details, ...details }
			}));
		},
		setLoading: (loading: boolean) => {
			update(state => ({ ...state, isLoading: loading }));
		},
		setError: (error: string | null) => {
			update(state => ({ ...state, error }));
		},
		reset: () => {
			set(initialState);
		}
	};
}

export const bookingStore = createBookingStore();

export const calculatedBooking = derived(bookingStore, ($booking) => {
	const { details, basePricePerNight, pricingTiers } = $booking;
	
	if (!details.checkIn || !details.checkOut) {
		return {
			nights: 0,
			totalPrice: 0,
			breakdown: [],
			isValid: false
		};
	}

	const checkInMs = details.checkIn.toDate(getLocalTimeZone()).getTime();
	const checkOutMs = details.checkOut.toDate(getLocalTimeZone()).getTime();
	const nights = Math.ceil((checkOutMs - checkInMs) / (1000 * 60 * 60 * 24));
	
	if (nights <= 0) {
		return {
			nights: 0,
			totalPrice: 0,
			breakdown: [],
			isValid: false
		};
	}

	let totalPrice = 0;
	const breakdown = [];
	
	for (let i = 0; i < nights; i++) {
		const currentDate = new Date(checkInMs + (i * 24 * 60 * 60 * 1000));
		const dateStr = currentDate.toISOString().split('T')[0];
		const dayOfWeek = currentDate.getDay();
		
		let dayPrice = basePricePerNight;
		let appliedTier = 'Standard';
		
		// Check for seasonal pricing
		for (const tier of pricingTiers) {
			if (tier.name === 'Weekend Premium' && (dayOfWeek === 5 || dayOfWeek === 6)) {
				dayPrice *= tier.multiplier;
				appliedTier = tier.name;
			} else if (tier.dates.some(date => dateStr >= date && dateStr <= date)) {
				dayPrice *= tier.multiplier;
				appliedTier = tier.name;
			}
		}
		
		totalPrice += dayPrice;
		breakdown.push({
			date: dateStr,
			price: dayPrice,
			tier: appliedTier
		});
	}

	return {
		nights,
		totalPrice: Math.round(totalPrice * 100) / 100,
		breakdown,
		isValid: true
	};
});