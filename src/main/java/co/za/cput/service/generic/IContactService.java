package co.za.cput.service.generic;

import co.za.cput.domain.generic.Contact;
import co.za.cput.service.IService;

import java.util.List;

public interface IContactService extends IService<Contact, Long> {
    List<Contact> getAllContacts();
}
