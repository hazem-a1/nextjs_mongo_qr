import { authOptions } from '@/auth/authOptions';
import dbConnect from '@/db/dbconnect';
import DynamicLink from '@/models/DynamicLink';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest,{ params }: { params: { id: string } }) {
  await dbConnect();
  
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {

      const {id} = params;

      const link = await DynamicLink.findOne({ _id: id, createdBy: session.user.id });
        if (!link) {
          return NextResponse.json({ error: 'Link not found' }, { status: 404 });
        }
        return NextResponse.json(link, { status: 200 });

  } catch (error) {
    
    return NextResponse.json({ error: 'Error fetching link' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest,{ params }: { params: { id: string } }) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {

      const {id} = params;

      const deletedLink = await DynamicLink.findOneAndDelete({ _id: id, createdBy: session.user.id });
      if (!deletedLink) {
        return NextResponse.json({ error: 'Link not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Link deleted successfully' }, { status: 200 });

  } catch (error) {
    console.log(error);
    
    return NextResponse.json({ error: 'Error deleting link' }, { status: 500 });
  }
}




export async function PUT(req: NextRequest,{ params }: { params: { id: string } }) {
  await dbConnect();
  
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const json = await req.json();
    const { shortCode, targetUrl, qrStyleOptions } = json;
    const { id } = params
      
      // Check if new shortCode already exists (excluding the current link)
      const existingLink = await DynamicLink.findOne({ shortCode, _id: { $ne: id } });
      if (existingLink) {
        return NextResponse.json({ error: 'Short code already in use' }, { status: 400 });
      }

      const updatedLink = await DynamicLink.findOneAndUpdate(
        { _id: id, createdBy: session.user.id },
        { shortCode, targetUrl, qrStyleOptions },
        { new: true, runValidators: true }
      );
      if (!updatedLink) {
        return NextResponse.json({ error: 'Link not found' }, { status: 404 });
      }
    
      return NextResponse.json({ updatedLink }, { status: 200 });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({ error: 'Error updating link' }, { status: 500 });
  }
}