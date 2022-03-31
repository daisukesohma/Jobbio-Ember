import Inflector from 'ember-inflector';

const inflector = Inflector.inflector;

inflector.irregular('talentresponse', 'users');
inflector.irregular('teammember', 'users');
inflector.irregular('channel-feed-item', 'companies/activities');

export default {};
