import $ from 'jquery';
import _ from 'underscore';
import Application from './models/application.js';
import ApplicationView from './views/application_view.js';
import Movie from './models/movie.js';
import MovieView from './views/movie_view.js';
import MovieList from './collections/movie_list.js';
import MovieListView from './views/movie_list_view.js';

var application = new Application();

$(document).ready(function() {
  var appView = new ApplicationView({
    el: 'body',
    model: application,
    movieTemplate: _.template($('#movie-template').html()),
    movieDetailsTemplate: _.template($('#movie-info-template').html()),
    alertTemplate: _.template($('#alert-template').html())
  });
  appView.showAllMovies();
});
