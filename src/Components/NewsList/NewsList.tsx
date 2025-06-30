import { useEffect } from "react";
import { useAppStore } from "../../stores/AppStore/AppStoreProvider";
import { observer } from "mobx-react-lite";
import { NewsItem } from "./ui/NewsItem";
import { Button, Flex, Skeleton, Alert } from "antd";

const SKELETON_COUNT = 6;

export const NewsList = observer(() => {
    const { isLoading, news, getNews, newsIds, getNewsIds, error } = useAppStore();

    useEffect(() => {
        const fetchInitialData = async () => {
            await getNewsIds();
        };
        
        fetchInitialData();
        const refreshInterval = setInterval(getNewsIds, 60000);
        return () => clearInterval(refreshInterval);
    }, [getNewsIds]);

    useEffect(() => {
        if (newsIds.length > 0) {
            getNews();
        }
    }, [newsIds, getNews]);

    const handleRefresh = () => {
        getNewsIds();
    };

    if (error) {
        return <Alert message="Error" description={error} type="error" showIcon />;
    }

    return (
        <Flex vertical>
            <Button 
                type="primary" 
                onClick={handleRefresh}
                loading={isLoading}
                disabled={isLoading}
            >
                Refresh
            </Button>
            
            {news.length > 0 && !isLoading ? (
                <Flex vertical>
                    {news.map((item) => (
                        <NewsItem key={item.id} id={item.id} news={item} />
                    ))}
                </Flex>
            ) : (
                Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                    <Skeleton key={index} active={isLoading} />
                ))
            )}
        </Flex>
    );
});