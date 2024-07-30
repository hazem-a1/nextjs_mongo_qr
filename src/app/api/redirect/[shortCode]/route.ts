import dbConnect from '@/db/dbconnect';
import DynamicLink from '@/models/DynamicLink';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest,{ params }: { params: { shortCode: string } }) {
 
  await dbConnect();
  
  try {

      const {shortCode} = params;

      const link = await DynamicLink.findOne({ shortCode });
        if (link) {
          return NextResponse.redirect(link.targetUrl)
        }else {
          return NextResponse.json({ error: 'link not found' }, { status: 404 });
        }
  } catch (error) {
    
    return NextResponse.json({ error: 'Error fetching link' }, { status: 500 });
  }
}
