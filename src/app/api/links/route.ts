import dbConnect from '@/db/dbconnect';
import DynamicLink from '@/models/DynamicLink';
import { NextResponse, NextRequest} from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth/authOptions';

 

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  await dbConnect();
  try {
    const json = await req.json();
    
    const { shortCode, targetUrl, qrDesign } = json;
    
    // Check if shortCode already exists
    const existingLink = await DynamicLink.findOne({ shortCode });
    if (existingLink) {
      return NextResponse.json({ error: 'Short code already in use' }, { status: 400 });
    }

    const newLink = new DynamicLink({
      shortCode,
      targetUrl,
      qrDesign,
      createdBy: session.user.id,
    });
    await newLink.save();
    
    return NextResponse.json({ newLink }, { status: 201 });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({ error: 'Error creating link' }, { status: 500 });
  }
}
