import promisePool from "../../../libs/db";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
    try {
        const formData = await req.formData();

        const jobId = formData.get("jobId");
        const name = formData.get("name");
        const email = formData.get("email");
        const experience = formData.get("experience");
        const coverLetter = formData.get("coverLetter");
        const cvFile = formData.get("cv"); // File object

        if (!jobId || !name || !email || !cvFile) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Save file to local uploads folder
        const buffer = Buffer.from(await cvFile.arrayBuffer());
        const uploadDir = path.join(process.cwd(), "public", "uploads");

        // Ensure folder exists (you may need to mkdir manually)
        const fileName = `${Date.now()}-${cvFile.name}`;
        const filePath = path.join(uploadDir, fileName);

        await writeFile(filePath, buffer);

        // Public URL (served from /public)
        const cvUrl = `/uploads/${fileName}`;

        // Insert application into MySQL
        const query = `
          INSERT INTO users_login.job_applications
          (job_id, name, email, experience, cover_letter, cv_path)
          VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [jobId, name, email, experience || "", coverLetter || "", cvUrl];

        const [result] = await promisePool.execute(query, values);

        return NextResponse.json(
            { success: true, message: "Application submitted", applicationId: result.insertId, cvUrl },
            { status: 201 }
        );
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { success: false, message: "Error submitting application", error: error.message },
            { status: 500 }
        );
    }
}

// GET → Fetch applications
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const jobId = searchParams.get("jobId");

        let query = "SELECT * FROM users_login.job_applications";
        let values = [];

        if (jobId) {
            query += " WHERE job_id = ?";
            values.push(jobId);
        }

        const [rows] = await promisePool.execute(query, values);

        return NextResponse.json({ success: true, applications: rows }, { status: 200 });
    } catch (error) {
        console.error("Fetch error:", error);
        return NextResponse.json(
            { success: false, message: "Error fetching applications", error: error.message },
            { status: 500 }
        );
    }
}
