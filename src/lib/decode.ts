import { jwtDecode } from "jwt-decode";

interface TokenPayload {
    id: number;
    email: string;
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJoYXNhbmtoQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU1NTkzMTcyLCJleHAiOjE3NjU1OTMxNzJ9.oFxdfvHzqb2gz9z84vlniiBCGjJJinSX2H5I1sW8vro"; // حط التوكن الحقيقي هون

try {
    const decoded = jwtDecode<TokenPayload>(token);
    console.log("User ID:", decoded.id);
    console.log("Email:", decoded.email);
} catch (error) {
    console.error("فشل في فك التوكن:", error);
}