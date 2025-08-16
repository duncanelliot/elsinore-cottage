# HSBC AEM & MDP Messages Automation Project - Organizational Chart

```mermaid
flowchart TD
    %% Senior Leadership (Decision Makers)
    VV["Venkat VAJPEY<br/>Senior Manager/Director<br/>Digital Marketing/Campaign Management"] 
    DA["Dan Avidan<br/>Senior Manager/Technical Lead<br/>US Operations"]
    
    %% Project Leadership
    TB["Tracey BAILEY<br/>Project Coordinator/Manager"]
    LY["Lambert J Z YAN<br/>Project Manager/Technical Lead<br/>Hong Kong Operations"]
    AC["Alex W L CHEN<br/>Technical Manager<br/>Hong Kong Operations"]
    
    %% Technical Team Leads
    TBA["Tomasz BAZANT<br/>Technical Lead/Architect<br/>European Operations"]
    GM["Grzegorz MAZIARZ<br/>Technical Lead<br/>European Operations"]
    JP["Jiri PALACKY<br/>Technical Lead<br/>European Operations"]
    
    %% Implementation/Support Team
    KV["Kosizin VISWANATHAN<br/>Technical Coordinator<br/>Communications Lead"]
    JH["Jimmy Jia Ming HE"]
    SK["Seema KUKADIA"]
    BH["Brian HUI"]
    
    %% Regional Teams - Asia Pacific
    subgraph APAC["Asia-Pacific Team"]
        PT["Paul Y K TONG"]
        PL["Phoenix H Y LI"]
        WC["Wendy Y CHEN"]
        AT["Arthur K S TSANG"]
        ND["Natalie DestJohn-Pryce"]
        AH["Audrey HO<br/>(Malaysia)"]
        TG["Tanielle GREEN<br/>(Singapore)"]
        MH["Mark HEDGES<br/>(Singapore)"]
    end
    
    %% Regional Teams - Europe
    subgraph EUR["European Team"]
        MD["Marcin DREWNOWSKI"]
        PW["Pawel WARECIAK"]
        RR["Robert RODAKOWSKI"]
        MK["Maciej M KUREK"]
    end
    
    %% Supporting Roles
    subgraph SUP["Supporting Roles"]
        AD["Alex J DE VINE"]
        MK2["Manish KUMAR"]
        GW["Grzegorz WENC"]
    end
    
    %% Reporting Structure
    VV --> TB
    VV --> LY
    VV --> AC
    
    DA -.-> VV
    
    TB --> KV
    LY --> APAC
    AC --> APAC
    
    VV --> TBA
    VV --> GM
    VV --> JP
    
    TBA --> EUR
    GM --> EUR
    JP --> EUR
    
    KV --> JH
    KV --> SK
    KV --> BH
    
    VV -.-> SUP
    
    %% Styling
    classDef seniorLeader fill:#e1f5fe,stroke:#0277bd,stroke-width:3px,color:#000
    classDef projectLead fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#000
    classDef techLead fill:#e8f5e8,stroke:#388e3c,stroke-width:2px,color:#000
    classDef implTeam fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#000
    classDef regional fill:#fce4ec,stroke:#c2185b,stroke-width:1px,color:#000
    classDef supporting fill:#f1f8e9,stroke:#689f38,stroke-width:1px,color:#000
    
    class VV,DA seniorLeader
    class TB,LY,AC projectLead
    class TBA,GM,JP techLead
    class KV,JH,SK,BH implTeam
    class PT,PL,WC,AT,ND,AH,TG,MH,MD,PW,RR,MK regional
    class AD,MK2,GW supporting
```

## Diagram Explanation

### Hierarchy Structure:
1. **Senior Leadership (Blue)**: Venkat VAJPEY leads the project with Dan Avidan in a senior advisory role
2. **Project Leadership (Purple)**: Direct reports to Venkat handling project coordination and technical management
3. **Technical Leads (Green)**: European operations technical leadership
4. **Implementation Team (Orange)**: Core technical coordination and support
5. **Regional Teams (Pink)**: Asia-Pacific and European operational teams
6. **Supporting Roles (Light Green)**: Additional project support personnel

### Key Relationships:
- Tracey BAILEY and Lambert J Z YAN report directly to Venkat VAJPEY for project coordination
- Regional teams are managed through their respective technical leads and project managers
- Kosizin VISWANATHAN serves as the central communications hub for the implementation team
- European technical leads (Tomasz, Grzegorz, Jiri) manage the European regional team
- Asia-Pacific team reports through Lambert YAN and Alex CHEN

This organizational structure reflects a matrix organization with clear hierarchical reporting while maintaining regional operational focus.