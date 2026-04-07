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
            if (!user) {
                // Not logged in -> show share view
                setIsOwner(false);
                setLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('artifacts')
                    .select('user_id')
                    .or(`share_token.eq.${id},id.eq.${id}`)
                    .single();

                if (data && data.user_id === user.id) {
                    setIsOwner(true);
                } else {
                    setIsOwner(false);
                }
            } catch (e) {
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
