import axios from 'axios';

/*--------------------------*/
/* Playlist Actions
/*--------------------------*/

// Expects a single video object
export const setCurrentVideo = (video) => {
  return {
    type: 'SET_CURRENT_VIDEO',
    video: video
  }
};

// Expects a counter single integer counter
export const updateVideoCounter = (counter) => {
  return {
    type: 'UPDATE_VIDEO_COUNTER',
    counter: counter
  }
}

// Expects an array of videos
export const setPlaylistVideos = (videos) => {
  return {
    type: 'SET_PLAYLIST_VIDEOS',
    videos: videos
  }
}

/*--------------------------*/
/* Auth actions
/*--------------------------*/
export const setCurrentUser = (user) => {
  return {
    type: 'SET_CURRENT_USER',
    //loggedIn: true,
    currentUser: user
  }
}

export const toggleLogin = () => {
  return {
    type:TOGGLE_LOGGED_IN_STATUS
  }
}


/*--------------------------*/
/* Navigation actions
/*--------------------------*/

export const setCurrentNavigation = (page) => {
  return {
    type: 'SET_CURRENT_NAVIGATION',
    page: page
  }
}

/*--------------------------*/
/* Bookmarks Actions (possibly async?)
/*--------------------------*/
export const updateBookMarkedVideos = (bookmarks) => {
  return {
      type: 'ADD_NEW_BOOKMARK',
      bookmarkedVideos: bookmarks
  }
}





/*--------------------------*/
/* Async actions
/*--------------------------*/

// Uses redux-thunk middleware for async action
// Allows you to wait for a response from a
// server before updating Redux store
export const getPlaylistByCategory = (category) => {
  return (dispatch, getState) => {
    return axios.get('/api/getPlaylistByCategory', {
        params: category
      })
      .then((response) => {
        var videos = response.data;
        console.log('Videos retrieved:', videos);
        dispatch(setPlaylistVideos(videos));
        dispatch(setCurrentVideo(videos[0]));
        dispatch(setCurrentNavigation('dashboard'));
      })
      .catch((error) => {
        console.log(error);
      })
  }
}
