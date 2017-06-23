import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import Rental from '../models/rental.js';

var RentalListView = Backbone.View.extend({
  initialize: function(params) {
    this.template = _.template($('#rentals-table-template').html());
    this.listenTo(this.model, 'update', this.render);
  },
  render: function() {
    var compiledTableTemplate = this.template({ rentals: this.model.toJSON() });
    this.$('main').html(compiledTableTemplate);
    return this;
  },
  events: {
    'click #rental-log' : 'showAllRentals',
    'click #outstanding-rentals' : 'showOutstandingRentals',
    'click #overdue-rentals' : 'showOverdueRentals'
  },
  showAllRentals: function () {
    this.model.url = "http://localhost:3000/rentals";
    this.model.fetch();
  },
  showOutstandingRentals: function () {
    this.model.url = "http://localhost:3000/rentals/outstanding";
    this.model.fetch();
  },
  showOverdueRentals: function () {
    this.model.url = "http://localhost:3000/rentals/overdue";
    this.model.fetch();
  }
});

export default RentalListView;
