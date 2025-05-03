import  db  from "../../../libs/db"; // Import database connection

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const { id } = req.query; // Get user ID from query

            // Fetch user name and photo from 'users_login.user_managements' table
            const [rows] = await db.query(
                "SELECT name, photo FROM users_login.user_managements WHERE id = ?",
                [id]
            );

            if (rows.length > 0) {
                res.status(200).json(rows[0]); // Send user data
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error("Database error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
