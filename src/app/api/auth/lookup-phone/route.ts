import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json({ email: null, error: "Phone required" }, { status: 400 });
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ email: null });
    }

    const supabase = getAdminClient();

    const { data, error } = await supabase
      .from("profiles")
      .select("email")
      .eq("phone", phone.trim())
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json({ email: null });
    }

    return NextResponse.json({ email: data.email });
  } catch (err: any) {
    return NextResponse.json({ email: null, error: err.message }, { status: 500 });
  }
}
