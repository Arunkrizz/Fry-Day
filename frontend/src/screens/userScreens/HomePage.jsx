import React, { useEffect, useState } from 'react'
// import SideBar from '../../components/UserComponents/SideBar'
import PostCard from '../../components/UserComponents/PostCard'
import { useGetUserPostsMutation } from '../../slices/userApiSlice'
import Loader from "../../components/UserComponents/Loader";
// import UserSideBar from "../../components/UserComponents/UserSideBar"
import RestaurantHeroHeader from '../../components/UserComponents/RestaurantHeroHeader'
import RestaurantProfile from './RestaurantProfile';
import { useNavigate, useLocation } from 'react-router-dom';
import RestaurantLocation from '../../components/UserComponents/RestaurantLocation'
import { useGetHotelLocationMutation } from '../../slices/userApiSlice';
import { useSelector, useDispatch } from "react-redux";
import { useCheckBlockMutation } from '../../slices/userApiSlice';
import LiveStreaming from '../../components/UserComponents/viewRestaurantLive'
import { toast } from 'react-toastify'
import { logout } from '../../slices/authSlice.js';
import { useLogoutMutation, useLikePostMutation, useUnlikePostMutation } from '../../slices/userApiSlice.js';
import InfiniteScroll from 'react-infinite-scroll-component';


function HomePage() {
  const [likePost] = useLikePostMutation();
  const [unlikePostApi] = useUnlikePostMutation();
  const [fetchHotelLocation] = useGetHotelLocationMutation()
  const { viewHotel } = useSelector((state) => state.viewHotel);
  const [restaurantLocation, setRestaurantLocation] = useState('')
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [blocked, setBlocked] = useState(false)
  const [blockCheck] = useCheckBlockMutation()
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [getPosts] = useGetUserPostsMutation()
  const [post, setPost] = useState('')
  const [location, setLocation] = useState(window.location.pathname)
  const [component, setComponent] = useState('')
  const [postRefresh, setPostRefresh] = useState(false)
  const locations = useLocation()


  const fetchMorePosts = async () => {
    setIsLoading(true);
    try {
      const response = await getPosts({ offset: post.length }); // Adjust offset based on API requirements
      setHasMorePosts(response.data.Post.length > 0); // Check if there's more to load
      let postsData = [...post, ...response.data.Post]

      // Check if the current user has liked each post
      const likedPosts = postsData.map((post) => ({
        ...post,
        isLiked: userInfo && post.likes.some((like) => like._id === userInfo.id)
      }));
      setPost(likedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {

    fetchMorePosts();
  }, [postRefresh]);

  useEffect(() => {
    const checkBlocked = async () => {
      try {
        console.log(userInfo,"userInfo in home check blok")
        const response = await blockCheck({ id: userInfo.id })
        if (response.error?.status === 401) {
          await logoutApiCall().unwrap();
          dispatch(logout())
          navigate('/login')
        }
        if (response.data?.is_blocked) {
          setBlocked(true)
          // Show a toast notification when the user is blocked
          toast.error("Your account is blocked");
        }
      } catch (error) {
        console.log(error, "error")
      }
    }
    checkBlocked()
  }, [blockCheck, userInfo, location])


  useEffect(() => {
    const handleBackButton = () => {
      // Do something when the back button is pressed
      setLocation(window.location.pathname)
    };

    handleBackButton();


  }, [locations]);


  const handleLikeClick = async (event, postId) => {
    event.stopPropagation(); // Prevent the event from propagating to the parent (Card) click handler
    if (!userInfo) {
      navigate('/login')
    }
    try {
      const response = post.find((post) => post._id === postId).isLiked
        ? await unlikePostApi(postId).unwrap()
        : await likePost(postId).unwrap();
      console.log("response on like: ", response);

      // Update the likes count in the post
      const updatedPosts = post.map((post) =>
        post._id === postId
          ? { ...post, likes: response.likes, isLiked: !post.isLiked }
          : post
      );

      setPost(updatedPosts);

    } catch (error) {
      console.log("Error adding like:", error);
    }
  };


  useEffect(() => {
    const renderComponent = () => {

      if (!blocked) {
        if (location === '/user/home/restaurant') {
          return <RestaurantProfile setLocation={setLocation} />;
        } else if (location === '/user/home') {
          return <InfiniteScroll
            dataLength={post.length}
            next={fetchMorePosts}
            hasMore={hasMorePosts}
            loader={post.length > 0 ? <Loader /> : ""}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <div style={{ marginLeft: '20px', marginTop: '20px' }}>
              {post ? post.map((post) => (<PostCard key={post._id} post={post} setLocation={setLocation} handleLikeClick={handleLikeClick} setPost={setPost} postRefresh={postRefresh} setPostRefresh={setPostRefresh} />)) : <Loader />}
            </div>
          </InfiniteScroll>
        } else if (location === '/user/home/viewHotelLocation') {
          return <RestaurantLocation location={restaurantLocation} />;
        }

        if (location === '/user/home/live') {
          return <LiveStreaming />;
        } else {
          return <div>Invalid URL</div>;
        }
      } else {
        return "User Blocked"
      }
    }
    setComponent(renderComponent())
  }, [location, post, restaurantLocation, blocked])


  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const responseFromApiCall = await fetchHotelLocation({ ...viewHotel })
        if (responseFromApiCall) {
          setRestaurantLocation(responseFromApiCall.data)
        }

      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    };

    fetchLocation(); // Call the async function
  }, [viewHotel])

  return (


    <div>

      {component}

    </div>
  )
}



export default HomePage