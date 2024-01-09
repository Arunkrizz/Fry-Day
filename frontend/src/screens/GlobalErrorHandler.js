function handleGlobalError(response,navigate) {
    console.log(response,"ressponse global");
    if (!response.ok)
     {
        // Handle error based on status code
        switch (response?.error?.status) {
            case 400:
                console.log("first")
                navigate('/admin/error-page')
                // Handle Bad Request
                break;
            case 401:
                console.log("second")
                navigate('/admin/error-page')
                // Handle Unauthorized
                break;
                case 500:
                    console.log("third")
                    navigate('/admin/error-page')
                    // Handle Bad Request
                    break;
            // Add more cases for other status codes as needed
            default:
                console.log("default")
                // Handle other cases
                break;
        }
    }
    return response;
}

export default handleGlobalError