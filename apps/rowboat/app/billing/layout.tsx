import AppLayout from '../projects/layout/components/app-layout';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AppLayout useRag={false} useAuth={true} useBilling={true}>
            {children}
        </AppLayout>
    );
}