import { useNavigate } from "react-router-dom";

function NotFoundPage() {
    const navigate = useNavigate();
    
    return (
        <div>
            <h1>Not Found Page</h1>
            <button onClick={() => navigate('/')}>Go back Home</button>
        </div>
    )
}

export default NotFoundPage;