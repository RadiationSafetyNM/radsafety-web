
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { supabase } from '../lib/supabase';

export const server = {
    saveFinding: defineAction({
        accept: 'form',
        input: z.object({
            id: z.string().optional(),
            title: z.string(),
            findingType: z.enum(['지적', '권고']),
            tags: z.array(z.string()),
            year: z.string(),
            description: z.string(),
            violationClause: z.string().optional(),
            solution: z.string().optional(),
        }),
        handler: async (input) => {
            const { id, title, findingType, tags, year, description, violationClause, solution } = input;

            if (id && !id.startsWith('local-')) {
                // Update existing record
                const { data, error } = await supabase
                    .from('findings')
                    .update({
                        title,
                        finding_type: findingType,
                        tags,
                        year,
                        description,
                        violation_clause: violationClause,
                        solution
                    })
                    .eq('id', id)
                    .select()
                    .single();

                if (error) throw new Error(error.message);
                return data;
            } else {
                // Insert new record
                const { data, error } = await supabase
                    .from('findings')
                    .insert({
                        title,
                        finding_type: findingType,
                        tags,
                        year,
                        description,
                        violation_clause: violationClause,
                        solution
                    })
                    .select()
                    .single();

                if (error) throw new Error(error.message);
                return data;
            }
        },
    }),

    deleteFinding: defineAction({
        input: z.object({
            id: z.string(),
        }),
        handler: async ({ id }) => {
            if (id.startsWith('local-')) return { success: true };

            const { error } = await supabase
                .from('findings')
                .delete()
                .eq('id', id);

            if (error) throw new Error(error.message);
            return { success: true };
        },
    }),
};
