"use server"

import { createClient } from "@/src/infra/supabase/client"
import { cookies } from "next/headers"

export const selecionaEventos = async () => {
    const supabase = await createClient(cookies())

    const { data: eventosDb } = await supabase.from('eventos').select()
    console.log(eventosDb)
}