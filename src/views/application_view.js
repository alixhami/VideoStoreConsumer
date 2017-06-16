import Backbone from 'backbone';
import MovieList from '../collections/movie_list.js';
import MovieListView from './movie_list_view.js';
import MovieDetailsView from './movie_details_view.js';

const ApplicationView = Backbone.View.extend({
  initialize: function (params) {
    this.movieListTemplate = params.movieListTemplate;
    this.movieDetailsTemplate = params.movieDetailsTemplate;
  },
  events: {
    'click h1' : 'showAllResults',
    'click #search-button' : 'searchMovies'
  },
  showAllResults: function () {
    this.showList();
  },
  showList: function (searchTerm) {
    var path = searchTerm ? ('?query=' + searchTerm) : '';
    var movieList = new MovieList(null, { path: path });
    movieList.fetch();

    var movieListView = new MovieListView({
      model: movieList,
      template: this.movieListTemplate,
      el: 'body'
    });
    movieListView.render();
    this.listenTo(movieListView, 'showMovieDetails', this.showMovieDetails);
  },
  searchMovies: function () {
    var searchTerm = this.getSearchTerm();
    this.showList(searchTerm);
  },
  showMovieDetails: function (movie) {
    var movieDetailsView = new MovieDetailsView({
      model: movie,
      template: this.movieDetailsTemplate,
      el: 'body'
    });
    movieDetailsView.render();
  },
  getSearchTerm: function () {
    var searchTerm = this.$('#search-box').val();
    this.$('#search-box').val('');

    return searchTerm;
  }
});

export default ApplicationView;
