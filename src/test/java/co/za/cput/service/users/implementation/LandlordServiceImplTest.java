package co.za.cput.service.users.implementation;

//Firstname:        Sinhle Xiluva
//LastName:         Mthethwa
//Student Number:   221802797.

import co.za.cput.domain.users.Landlord;
import co.za.cput.factory.user.LandlordFactory;
import co.za.cput.service.users.ILandLordService;

class LandlordServiceImplTest {

    @Autowired
    private static ILandLordService service;
    private static Landlord landlord = LandlordFactory.createLandlord(
            "Sinhle",
            "Mthethewa");

    @Test
    void a_create() {
        Landlord created = service.create(landlord);
        assertNotNull(created);
        System.out.println(created);
    }
    @Test
    void b_read() {
        Landlord read = service.read(landlord.getLandlordID());
        assertNotNull(read);
        System.out.println(read);
    }
    @Test
    void c_update() {
        Landlord newLandlord = new Landlord.Builder().copy(landlord).setLandlordFirstName("Sinhle").build();
        Landlord updated = service.update(landlord);
        assertNotNull(updated);
        System.out.println(updated);
    }

    @Test
    void e_delete() {

    }
    @Test
    void d_getAll() {
        System.out.println(service.getAll());
    }
}

