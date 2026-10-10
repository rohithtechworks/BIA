import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { modules } from "@/lib/catalog";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      success: false,
      message: "Supabase environment variables are not configured.",
    });
  }

  try {
    const supabase = getAdminClient();

    let insertedCourses = 0;
    let insertedLessons = 0;

    for (let i = 0; i < modules.length; i++) {
      const mod = modules[i];

      // Upsert Course
      const { data: courseData, error: courseError } = await supabase
        .from("courses")
        .upsert(
          {
            slug: mod.slug,
            title: mod.title,
            description: mod.description,
            accent: mod.accent,
            icon: mod.icon,
            order_index: i + 1,
          },
          { onConflict: "slug" }
        )
        .select()
        .single();

      if (courseError) {
        console.error("Error upserting course:", courseError);
        continue;
      }

      insertedCourses++;

      // Upsert Lessons for this Course
      for (let j = 0; j < mod.lessons.length; j++) {
        const les = mod.lessons[j];
        const { error: lesError } = await supabase
          .from("lessons")
          .upsert(
            {
              course_id: courseData.id,
              course_slug: mod.slug,
              slug: les.slug,
              title: les.title,
              type: les.type || "video",
              media_url: les.src || null,
              external_url: les.externalUrl || null,
              order_index: j + 1,
            },
            { onConflict: "course_slug,slug" }
          );

        if (!lesError) {
          insertedLessons++;
        } else {
          console.error("Error upserting lesson:", lesError);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${insertedCourses} courses and ${insertedLessons} lessons into Supabase database.`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Seeding failed" },
      { status: 500 }
    );
  }
}
