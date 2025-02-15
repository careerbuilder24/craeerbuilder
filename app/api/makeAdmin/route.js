import promisePool from "@/libs/db"; // Fix import

export async function POST(req) {
  try {
    // Parse request body
    const { email, role } = await req.json();
    console.log("Received request:", { email, role });

    if (!email || !role) {
      console.error("Missing email or role");
      return new Response(JSON.stringify({ message: "Email and role are required" }), { status: 400 });
    }

    // Run the UPDATE query
    const [result] = await promisePool.query(
      "UPDATE user_managements SET role = ? WHERE email = ?",
      [role, email]
    );

    console.log("Query result:", result);

    if (result.affectedRows === 0) {
      console.error("User not found or role not updated");
      return new Response(JSON.stringify({ message: "User not found or role not updated" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Role updated successfully" }), { status: 200 });

  } catch (error) {
    console.error("Database update error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}


export async function GET() {
  try {
    const [users] = await promisePool.query("SELECT name, email, role FROM users_login.user_managements;"); // Fetch users with role
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    const { email } = await req.json();
    console.log("Received request to delete user:", { email });

    if (!email) {
      return new Response(JSON.stringify({ message: "Email is required" }), { status: 400 });
    }

    const [result] = await promisePool.query(
      "DELETE FROM user_managements WHERE email = ?",
      [email]
    );

    if (result.affectedRows === 0) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "User deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Database delete error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
