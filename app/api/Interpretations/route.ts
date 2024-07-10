import client from "@/libs/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

// create Interpretation
async function createInterpretation(data: {
  term: string;
  Interpretations: string;
}) {
  try {
    const response = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABSE_ID as string,
      "Interpretations",
      ID.unique(),
      data
    );

    return response;
  } catch (error) {
    console.error("Error creating interpretation: ", error);
    throw new Error("Failed to create interpretation");
  }
}

// fetch interpretations
async function fetchInterpretations() {
  try {
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABSE_ID as string,
      "Interpretations",
      [Query.orderDesc("$createdAt")]
    );

    return response.documents;
  } catch (error) {
    console.error("Error fetching interpretation: ", error);
    throw new Error("Failed to fetching interpretation");
  }
}

//todo: Function POST
export async function POST(req: Request) {
  try {
    const { term, Interpretations } = await req.json();
    const data = { term, Interpretations };
    const response = await createInterpretation(data);
    return NextResponse.json({
      message: "Interpretation created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create interpretation" },
      { status: 500 }
    );
  }
}

//? Get interpretation
export async function GET() {
  try {
    const interpretations = await fetchInterpretations();
    return NextResponse.json(interpretations);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch interpretation" },
      { status: 500 }
    );
  }
}

