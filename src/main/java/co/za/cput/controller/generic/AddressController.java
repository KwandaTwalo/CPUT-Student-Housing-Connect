package co.za.cput.controller.generic;

import co.za.cput.domain.generic.Address;
import co.za.cput.service.generic.implementation.AddressServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/HouseConnect/Address")
public class AddressController {

    private AddressServiceImpl addressService;

    @Autowired
    public AddressController(AddressServiceImpl addressService) {
        this.addressService = addressService;
    }

    @PostMapping("/create")
    public ResponseEntity<Address> create(@RequestBody Address address) {
       Address createdAddress = addressService.create(address);
       return ResponseEntity.ok(createdAddress);
    }

    @GetMapping("/read/{addressID}")
    public ResponseEntity<Address> read(@PathVariable Long addressID) {
        Address readAddress = addressService.read(addressID);
        if (readAddress == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(readAddress);
    }

    @PutMapping("/update")
    public ResponseEntity<Address> update(@RequestBody Address address) {
        if (address.getAddressID() == null) {
            return ResponseEntity.badRequest().build();
        }
        Address updatedAddress = addressService.update(address);
        if (updatedAddress == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedAddress);
    }

    @GetMapping("/getAllAddress")
    public ResponseEntity<List<Address>> getAllAddress() {
        List<Address> addressList = addressService.getAllAddress();
        if (addressList == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(addressList);
    }

    @DeleteMapping("/delete/{addressID}")
    public void delete(@PathVariable Long addressID) {
        addressService.delete(addressID);
    }



}
