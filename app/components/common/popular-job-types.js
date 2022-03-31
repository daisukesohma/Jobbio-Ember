import BaseComponent from '../base-component';

export default BaseComponent.extend({
  popularJobTypes: null,
  init() {
    this._super(...arguments);
    this.set('popularJobTypes', [[{
      name: 'Sales',
      link: 'Sales',
      icon: 'Money-Bag'
    },{
      name: 'Software Engineer',
      link: 'Software Engineer',
      icon: 'Coding'
    },{
      name: 'Marketing',
      link: 'Marketing',
      icon: 'Smartphone-2'
    }],[{
      name: 'Technology',
      link: 'Technology',
      icon: 'Computer'
    },{
      name: 'Account Management',
      link: 'Account Management',
      icon: 'Notepad'
    },{
      name: 'Finance',
      link: 'Finance',
      icon: 'Line-Chart'
    }],[{
      name: 'Customer Service',
      link: 'Customer Service',
      icon: 'Phone-2'
    },{
      name: 'Product',
      link: 'Product',
      icon: 'Pencil-Ruler'
    },{
      name: 'Remote',
      link: 'Remote',
      icon: 'Computer'
    }]]);
  },
});
