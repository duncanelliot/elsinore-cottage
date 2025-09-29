import {
	Sofa,
	Utensils,
	Bed,
	Bath,
	Package,
	ArrowUp,
	TreePine,
	DoorOpen,
	Toilet
} from '@lucide/svelte';

// Room enum matching Prisma schema
export enum Room {
	LIVING_ROOM = 'LIVING_ROOM',
	DINING_ROOM = 'DINING_ROOM',
	KITCHEN = 'KITCHEN',
	STAIRS = 'STAIRS',
	BEDROOM_MAIN = 'BEDROOM_MAIN',
	BEDROOM_ENSUITE = 'BEDROOM_ENSUITE',
	BEDROOM_STUDY = 'BEDROOM_STUDY',
	BATHROOM = 'BATHROOM',
	BATHROOM_ENSUITE = 'BATHROOM_ENSUITE',
	TOILETS = 'TOILETS',
	GARDEN = 'GARDEN',
	HALLWAY = 'HALLWAY'
}

// Room display configuration
export interface RoomConfig {
	enum: Room;
	displayName: string;
	icon: any;
	color: string;
}

// Complete mapping of Room enum to display configuration
export const ROOM_CONFIGS: Record<Room, RoomConfig> = {
	[Room.LIVING_ROOM]: {
		enum: Room.LIVING_ROOM,
		displayName: 'Living Room',
		icon: Sofa,
		color: 'blue'
	},
	[Room.DINING_ROOM]: {
		enum: Room.DINING_ROOM,
		displayName: 'Dining Room',
		icon: Utensils,
		color: 'green'
	},
	[Room.KITCHEN]: {
		enum: Room.KITCHEN,
		displayName: 'Kitchen',
		icon: Utensils,
		color: 'orange'
	},
	[Room.STAIRS]: {
		enum: Room.STAIRS,
		displayName: 'Stairs',
		icon: ArrowUp,
		color: 'slate'
	},
	[Room.BEDROOM_MAIN]: {
		enum: Room.BEDROOM_MAIN,
		displayName: 'Bedroom - Main',
		icon: Bed,
		color: 'purple'
	},
	[Room.BEDROOM_ENSUITE]: {
		enum: Room.BEDROOM_ENSUITE,
		displayName: 'Bedroom - Ensuite',
		icon: Bed,
		color: 'violet'
	},
	[Room.BEDROOM_STUDY]: {
		enum: Room.BEDROOM_STUDY,
		displayName: 'Bedroom - Study',
		icon: Bed,
		color: 'indigo'
	},
	[Room.BATHROOM]: {
		enum: Room.BATHROOM,
		displayName: 'Bathroom',
		icon: Bath,
		color: 'cyan'
	},
	[Room.BATHROOM_ENSUITE]: {
		enum: Room.BATHROOM_ENSUITE,
		displayName: 'Bathroom - Ensuite',
		icon: Bath,
		color: 'teal'
	},
	[Room.TOILETS]: {
		enum: Room.TOILETS,
		displayName: 'Toilets',
		icon: Toilet,
		color: 'sky'
	},
	[Room.GARDEN]: {
		enum: Room.GARDEN,
		displayName: 'Garden',
		icon: TreePine,
		color: 'emerald'
	},
	[Room.HALLWAY]: {
		enum: Room.HALLWAY,
		displayName: 'Hallway',
		icon: DoorOpen,
		color: 'gray'
	}
};

// Helper functions
export function getRoomDisplayName(room: Room): string {
	return ROOM_CONFIGS[room]?.displayName || room;
}

export function getRoomColor(room: Room): string {
	return ROOM_CONFIGS[room]?.color || 'slate';
}

export function getRoomIcon(room: Room) {
	return ROOM_CONFIGS[room]?.icon || Package;
}

// Generate room filters for UI components
export function generateRoomFilters() {
	const allRoomsFilter = {
		name: 'All Rooms',
		enum: null,
		icon: Package,
		color: 'slate'
	};

	const roomFilters = Object.values(ROOM_CONFIGS).map(config => ({
		name: config.displayName,
		enum: config.enum,
		icon: config.icon,
		color: config.color
	}));

	return [allRoomsFilter, ...roomFilters];
}