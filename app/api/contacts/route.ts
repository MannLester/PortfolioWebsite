import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { NextResponse } from "next/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'active', 'all', or specific contact_type
    const contactType = searchParams.get('contactType'); // specific contact type filter
    
    let contacts;
    
    if (contactType) {
      contacts = await convex.query(api.contacts.getContactsByType, { contact_type: contactType });
    } else {
      switch (type) {
        case 'all':
          contacts = await convex.query(api.contacts.getAllContacts);
          break;
        default:
          contacts = await convex.query(api.contacts.getActiveContacts);
      }
    }
    
    return NextResponse.json({
      success: true,
      data: contacts,
      count: contacts.length
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch contacts',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
          message: 'Name, email, subject, and message are required'
        },
        { status: 400 }
      );
    }

    const result = await convex.mutation(api.contacts.submitContactMessage, {
      name,
      email,
      subject,
      message,
    });

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Message sent successfully'
    });
  } catch (error) {
    console.error('Error submitting contact message:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit contact message',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}