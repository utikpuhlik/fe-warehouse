import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function CardSkeleton() {
    return (
        <Card className="animate-pulse shadow-sm">
            <CardHeader className="pb-2">
                <div className="h-4 w-1/2 bg-muted rounded" />
            </CardHeader>
            <CardContent>
                <div className="h-6 w-1/3 bg-muted rounded" />
            </CardContent>
        </Card>
    );
}
