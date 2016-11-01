import { handleError } from '../lib/routes-util';
import Contact from '../models/contact';

export default function(router) {
  router.route('/:id')
    .get(getContact)
    .put(updateContact)
    .delete(deleteContact);

  router.route('/')
    .get(getContacts)
    .post(createContact);

  return router;
}

function getContacts(req, res) {
  Contact.find(function(err, contacts) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.")
    } else {
      res.status(200).json(contacts);
    }
  })
}

function getContact(req, res) {
  Contact.findById(req.params.id, function(err, contact) {
    if (err) {
      handleError(res, err.message, "Failed to get contact.");
    } else {
      res.status(201).json(contact);
    }
  })
}

function createContact(req, res) {
  let newContact = new Contact({...req.body});

  newContact.save(function(err, contact) {
    if (err) {
      handleError(res, err.message, "Failed to create new contact.");
    } else {
      res.status(201).json(contact);
    }
  });
}

function updateContact(req, res) {
  Contact.findById(req.params.id, function(err, contact) {
    if (err) {
      handleError(res, err.message, "Contact does not exist.");
    }

    contact.update(req.body, function(err) {
      if (err) {
        handleError(res, err.message, "Failed to update contact.");
      } else {
        res.status(204).end();
      }
    })
  })
}

function deleteContact(req, res) {
  Contact.findById(req.params.id, function(err, contact) {
    if (err) {
      handleError(res, err.message, "Contact does not exist.");
    }

    contact.remove(function(err) {
      if (err) {
        handleError(res, err.message, "Failed to delete contact.");
      } else {
        res.status(204).end();
      }
    })
  })
}
