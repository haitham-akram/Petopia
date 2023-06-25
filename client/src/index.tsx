import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PostCard from './components/PostCard.tsx';

const post = {
    postId: 1,
    userId: 1,
    categoryId: 1,
    postContent: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam error alias saepe dolores. Aliquam, ipsam magnam minus blanditiis qui doloremque vel, quo, esse natus ipsa aut placeat ullam tempora eius.",
    isHaveImg: true,
    likesCount: 2,
    commentsCount: 3,
    createdAt: "2023-06-24T12:51:15.220Z",
    updatedAt: "2023-06-24T12:54:26.372Z",
    postImages: [
        {
            imageId: 1,
            postId: 1,
            imageUrl: "https://cdn.discordapp.com/attachments/1113720733860888597/1121405281147027526/IMG_20201207_144829.jpg",
            createdAt: "2023-06-24T12:51:15.224Z",
            updatedAt: "2023-06-24T12:51:15.224Z"
        },
        {
            imageId: 3,
            postId: 1,
            imageUrl: "https://cdn.discordapp.com/attachments/1113720733860888597/1121405280366899304/IMG_20201117_134403.jpg",
            createdAt: "2023-06-24T12:51:15.224Z",
            updatedAt: "2023-06-24T12:51:15.224Z"
        },
        {
            imageId: 4,
            postId: 1,
            imageUrl: "https://i.imgur.com/KcYHnFr.jpg",
            createdAt: "2023-06-24T12:51:15.224Z",
            updatedAt: "2023-06-24T12:51:15.224Z"
        },
        {
            imageId: 5,
            postId: 1,
            imageUrl: "https://i.imgur.com/v5xOSq2.jpg",
            createdAt: "2023-06-24T12:51:15.224Z",
            updatedAt: "2023-06-24T12:51:15.224Z"
        }
    ],
    "category": {
        "title": "Adoption"
    },
    "user": {
        "userId": 1,
        "fullName": "Haitham Abu Lamdi",
        "userImage": "https://cdn.discordapp.com/attachments/1113720733860888597/1121405281147027526/IMG_20201207_144829.jpg",
        "phoneNumber": 599888888
    },
    "products": [],
    "pets": [
        {
            "petId": 2,
            "petName": "Bella",
            "age": 2,
            "gender": "Female",
            "healthStatus": "Vaccinated",   
            "adoptionStatus": "Adopted",
            "petType": {
                "typeId": 2,
                "title": "Cat"
            }
        }
    ]
}
const router = createBrowserRouter([
    {
        path: '/post',
        element: <PostCard post={post} />
    }
])
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router={router} />
)
