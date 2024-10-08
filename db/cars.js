const cars = [
    {   
        id: 1, 
        make: 'Chevrolet', 
        model: 'ASTRA 2000-2006. MOTOR 1.8-2.0, 4 CIL.', 
        oilFilter: ['LTH-3751CT', 'LTH-46'], 
        airFilter: ['RA-1935', 'F-19A35'], 
        fuelFilter: ['RFG-012', 'GG-64', 'FGI-12'], 
        sparkPlug: ['BPR5EGP(7082)', 'BKR5EGP(7090)'], 
        sparkPlugWires: ['B6935FT4(HI-POWER)'], 
        battery: ['L-41/650'], 
        oil: ['15w/40']
    },
    {   
        id: 2, 
        make: 'Chevrolet', 
        model: 'SUBURBAN 2003-2006. MOTOR 5.3-5.7., 8 CIL.', 
        oilFilter: ['LTH-44'], 
        airFilter: ['RA-8755', 'F-87A55', 'GA-348'], 
        fuelFilter: ['RFG-019', 'GG-46'], 
        sparkPlug: ['TR55GP'], 
        sparkPlugWires: ['CB-315 (KEM)'], 
        battery: ['L-34/78-750'], 
        oil: ['15w/40', '10w/30']
    },
    {   
        id: 3, 
        make: 'Dodge', 
        model: 'DURANGO 2002-2004. MOTOR 3.7 (6 CIL) 4.7 (4 CIL).', 
        oilFilter: ['LTH-81'], 
        airFilter: ['RA-9962', 'F-99A62'], 
        fuelFilter: [], 
        sparkPlug: ['LZTR4AGP(5017)', 'ZFR6GP(7100)'], 
        sparkPlugWires: ['L-3305(KEM)', '0986MG0114(BOSH)'], 
        battery: ['L-65/800'], 
        oil: ['15w/40', '10w/30']
    },
    {   
        id: 4, 
        make: 'Ford', 
        model: 'FIESTA 1998-2002. MOTOR 1.3-1.4, (4 CIL).', 
        oilFilter: ['LTH-58'], 
        airFilter: ['RA-1004', 'F-580A', 'GA-179'], 
        fuelFilter: ['RFG-011'], 
        sparkPlug: ['TRR5GP'], 
        sparkPlugWires: ['0986MG0471(BOSCH)'], 
        battery: ['L-99LN0', 'L-42/500'], 
        oil: ['15w/40', '10w/30']
    },
    {   
        id: 5, 
        make: 'Ford', 
        model: 'F-150 1997-2006. MOTOR 4.2(6 CIL) 4.6(4 CIL).', 
        oilFilter: ['LTH-9', 'LTH-3600'], 
        airFilter: ['F-80A04', 'GA-1615'], 
        fuelFilter: ['RFG-10133', 'RFG-018', 'GG-986'], 
        sparkPlug: ['TR55GP'], 
        sparkPlugWires: ['L-6248(KEM)'], 
        battery: ['L-65/86 LN', 'L-41/650 LN'], 
        oil: ['15w/40', '10w/30']
    },
    {   
        id: 6,
        make: 'Honda', 
        model: 'CIVIC 2000-2007. MOTOR 1.7-1.8-2.0  (4 CIL).', 
        oilFilter: ['LTH-149'], 
        airFilter: ['R-9493', 'F-94A93'], 
        fuelFilter: ['RFG-292'], 
        sparkPlug: ['ZFR6F-11'], 
        sparkPlugWires: ['CB-205 (KEM)'], 
        battery: ['L-51R/500'], 
        oil: ['15w/40', '10w/30']
    },
    {   
        id: 7,
        make: 'Mazda', 
        model: 'MAZDA 3 2006-2012. MOTOR 2.0-2.3.-2.5  (4 CIL).', 
        oilFilter: ['LTH-58'], 
        airFilter: ['F-98A98', 'GA-596'], 
        fuelFilter: [], 
        sparkPlug: ['LTR6IX-11(6509)'], 
        sparkPlugWires: ['L-6193(KEM)', '0986MG0002(BOSCH)'], 
        battery: ['L-24R/530', 'L-35/575'], 
        oil: ['5w/30', 'SINTETICO']
    },
    {   
        id: 8,
        make: 'Nissan', 
        model: 'SENTRA 1996-2003. MOTOR 1.6-1.8 (4 CIL).', 
        oilFilter: ['LTH-91', 'LTH-149'], 
        airFilter: ['RA-4309', 'F-43A09', 'GAD-15'], 
        fuelFilter: ['RFG-037', 'GG-137'], 
        sparkPlug: ['BKR5GP(7090)', 'LFR5AGP(5018)'], 
        sparkPlugWires: ['L-2101(KEM)', 'CB-149(KEM)'], 
        battery: ['L-35/575', 'L-24R/530'], 
        oil: ['20w/50', '15w/40']
    },
    {   
        id: 9,
        make: 'Nissan', 
        model: 'PICK UP 1993-2010. MOTOR 2.4 (4 CIL).', 
        oilFilter: ['LTH-149'], 
        airFilter: ['F-68A50', 'GAD-294'], 
        fuelFilter: ['RFG-037', 'GG-137', 'RFG-027'], 
        sparkPlug: ['BKR5E-11(5101)'], 
        sparkPlugWires: ['0986MG0725(BOSCH)'], 
        battery: ['L-35/575', 'L-24R/530'], 
        oil: ['15w/40', '10w/30']
    },
    {   
        id: 10,
        make: 'Toyota', 
        model: 'HILUX 2007-2012. MOTOR 2.7(4 CIL).', 
        oilFilter: ['LTH-58'], 
        airFilter: ['F-10ALO', 'GA-1781'], 
        fuelFilter: ['FGI-0246'], 
        sparkPlug: ['LFR6GGP'], 
        sparkPlugWires: ['B6925344(HI-POWER)'], 
        battery: ['L-35/575', 'L-24R/530'], 
        oil: ['5w/30', 'SINTETICO']
    },
    {   
        id: 11,
        make: 'Volkswagen', 
        model: 'JETTA  1993-2002. MOTOR 1.8(4 CIL).', 
        oilFilter: ['LTH-28'], 
        airFilter: ['F-74A31', 'GAVEO-121'], 
        fuelFilter: ['RFG-028'], 
        sparkPlug: ['BKR5EGP'], 
        sparkPlugWires: ['0986MG0307(BOSCH)'], 
        battery: ['L-47LN', 'L42/500'], 
        oil: ['15w/40']
    },
];

module.exports = cars;

/*
{   
    id: 11,
    make: 'Volkswagen', 
    model: 'JETTA  1993-2002. MOTOR 1.8(4 CIL).', 
    oilFilter: ['LTH-28'], 
    airFilter: ['F-74A31', 'GAVEO-121'], 
    fuelFilter: ['RFG-028'], 
    sparkPlug: ['BKR5EGP'], 
    sparkPlugWires: ['0986MG0307(BOSCH)'], 
    battery: ['L-47LN', 'L42/500'], 
    oil: ['15w/40']
},


*/