import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import Index from "@/pages/Index";
import ShareView from "./ShareView";

export default function ProjectRouter() {
    const { id } = useParams<{ id: string }>();
    const [isOwner, setIsOwner] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkOwnership = async () => {
            if (!id) return;
            const { data: { user } } = await supabase.auth.getUser();
            
            try {
                // Determine if ID is a valid UUID to avoid Supabase 400 error
                const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
                const isUuid = uuidRegex.test(id);

                let query = supabase.from('artifacts').select('user_id');
                if (isUuid) {
                    query = query.or(`id.eq.${id},share_token.eq.${id}`);
                } else {
                    query = query.eq('share_token', id);
                }

                const { data, error } = await query.single();

                if (!user) {
                    setIsOwner(false);
                } else if (data && data.user_id === user.id) {
                    setIsOwner(true);
                } else {
                    setIsOwner(false);
                }
            } catch (e) {
                console.warn("Ownership sync fail:", e);
                setIsOwner(false);
            }
            setLoading(false);
        };
        checkOwnership();
    }, [id]);

    if (loading) return null;

    if (isOwner) {
        return <Index urlId={id} />;
    } else {
        return <ShareView />;
    }
}
