'use client';
import { getDataSource } from "../../../../actions/datasource_actions";
import { DataSource } from "../../../../lib/types/datasource_types";
import { useEffect, useState } from "react";
import { z } from 'zod';
import { SourceStatus } from "./source-status";

export function SelfUpdatingSourceStatus({
    projectId,
    sourceId,
    initialStatus,
    compact = false,
}: {
    projectId: string;
    sourceId: string,
    initialStatus: z.infer<typeof DataSource>['status'],
    compact?: boolean;
}) {
    const [status, setStatus] = useState(initialStatus);

    useEffect(() => {
        let ignore = false;
        let timeoutId: NodeJS.Timeout | null = null;

        async function check() {
            if (ignore) {
                return;
            }
            const source = await getDataSource(projectId, sourceId);
            setStatus(source.status);
            timeoutId = setTimeout(check, 15 * 1000);
        }

        if (status == 'pending') {
            timeoutId = setTimeout(check, 15 * 1000);
        }

        return () => {
            ignore = true;
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [status, projectId, sourceId]);

    return <SourceStatus status={status} compact={compact} projectId={projectId} />;
}