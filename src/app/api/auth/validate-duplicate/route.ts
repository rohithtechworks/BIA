import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export async function POST(req: Request) {
  try {
    const { email, phone } = await req.json();

    if (!email || !phone) {
      return NextResponse.json(
        { ok: false, message: "Email and phone number are required." },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ ok: true });
    }

    const supabase = getAdminClient();

    // Check profiles table for existing email or phone
    const { data: emailMatch } = await supabase
      .from("profiles")
      .select("id")
      .ilike("email", email.trim())
      .maybeSingle();

    if (emailMatch) {
      return NextResponse.json(
        { ok: false, message: "This email address is already registered." },
        { status: 400 }
      );
    }

    const { data: phoneMatch } = await supabase
      .from("profiles")
      .select("id")
      .eq("phone", phone.trim())
      .maybeSingle();

    if (phoneMatch) {
      return NextResponse.json(
        { ok: false, message: "This phone number is already registered." },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: error?.message || "Validation failed" },
      { status: 500 }
    );
  }
}
