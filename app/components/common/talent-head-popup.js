import HeadComponent from '../head-component';

export default HeadComponent.extend({
    actions: {
        jobSearch: function() {
            // Reset searched type filter
            window.$('#search_job_type_input').val('');
            window.$('.search-job-type').show();
        }
    }
});
