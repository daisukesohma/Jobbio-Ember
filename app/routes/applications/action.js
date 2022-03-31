import BaseRoute from '../base-route';
import config from '../../config/environment';

export default BaseRoute.extend({
  model(params){
    var data = {token: params.token, status: params.status};
    var url = config.APP.API_HOST+'/jobs/' + params.job_id + '/applications/' + params.id + '/update';
    return window.$.ajax({
          url: url,
          type: 'PATCH',
          data: JSON.stringify(data),
          contentType: 'application/json;charset=utf-8',
          dataType: 'json'
      })
      .then((response)=> {
        return {success: true, action: params.status, response: response};
      }, () => {
        return {success: false};
      });
  }
});
