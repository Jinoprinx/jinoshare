'''import Mailjet from 'node-mailjet';
import { config } from '../config';

const mailjet = new Mailjet({
  apiKey: config.mailjet.apiKey,
  apiSecret: config.mailjet.apiSecret,
});

export const addContactToList = async (email: string, name: string) => {
  if (!config.mailjet.apiKey || !config.mailjet.apiSecret || !config.mailjet.contactListId) {
    console.warn('Mailjet API key, secret, or contact list ID not configured. Skipping marketing list subscription.');
    return;
  }

  try {
    await mailjet
      .post('contactslist', { 'id': config.mailjet.contactListId })
      .action('managecontact')
      .request({
        Name: name,
        Properties: 'object',
        Action: "addnoforce",
        Email: email
      });
    console.log(`Successfully added ${email} to Mailjet contact list.`);
  } catch (error) {
    console.error('Error adding contact to Mailjet:', error);
  }
};
'''