package co.za.cput.service.generic.implementation;

import co.za.cput.domain.generic.Contact;
import co.za.cput.repository.generic.ContactRepository;
import co.za.cput.service.generic.IContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactServiceImpl implements IContactService {

    private ContactRepository contactRepository;

    @Autowired
    public ContactServiceImpl(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Override
    public Contact create(Contact contact) {
        return contactRepository.saveAndFlush(contact);
    }

    @Override
    public Contact read(Long ID) {
        return contactRepository.findById(ID).orElse(null);
    }

    @Override
    public Contact update(Contact contact) {
        return contactRepository.saveAndFlush(contact);
    }

    @Override
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    @Override
    public void delete(Long ID) {
        contactRepository.deleteById(ID);
    }
}
