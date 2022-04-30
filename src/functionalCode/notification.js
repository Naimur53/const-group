
import { cancelNotification, sendNotification } from '../features/data/dataSlice'
const processingNotification = (user, post, type, dispatch, method) => {
    if (method === 'post') {
        if (user.email !== post.client?.email) {
            let data = {
                user: user,
                client: post.client.email,
                postIn: post.postIn,
                time: new Date(),
                postId: post._id,
                view: false,
                type,
            };
            dispatch(sendNotification(data))
        }
    }
    else if (method === 'cancel') {
        console.log('comming');
        if (user.email !== post.client?.email) {
            let data = {
                user: user,
                client: post.client.email,
                postIn: post.postIn,
                time: new Date(),
                postId: post._id,
                view: false,
                type,
            };
            dispatch(cancelNotification(data))
        }
    }

}
export default processingNotification;