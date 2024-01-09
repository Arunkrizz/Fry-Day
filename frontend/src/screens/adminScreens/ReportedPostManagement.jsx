import { useEffect, useState } from "react";
import { useGetReportedPostsMutation } from "../../slices/adminApiSlice";
import Loader from "../../components/Loader";
import ReportedPostsTable from "../../components/AdminComponents/ReportedPostsTable";
import { Container } from "react-bootstrap";
import handleGlobalError from "../GlobalErrorHandler";
import { useNavigate } from "react-router-dom";
const ReportedPostsScreen = () => {
    const navigate = useNavigate()

    const [reportedPosts, setReportedPosts] = useState([]);
    const [getReportedPosts, { isLoading }] = useGetReportedPostsMutation();

    useEffect(() => {
        const fetchReportedPosts = async () => {
            try {
                const response = await getReportedPosts()
                .then((response)=>handleGlobalError(response,navigate))
                console.log("response reported posts: ", response);
                setReportedPosts(response.data);
            } catch (error) {
                console.error("Error fetching reported posts:", error);
            }
        };

        fetchReportedPosts();
    }, [getReportedPosts]);

    return (
        <Container>
            <h1 className="p-2">Reported Posts</h1>
            {isLoading ? <Loader /> : <ReportedPostsTable reportedPosts={reportedPosts} setReportedPosts={setReportedPosts} />}
        </Container>
    );
};

export default ReportedPostsScreen;
