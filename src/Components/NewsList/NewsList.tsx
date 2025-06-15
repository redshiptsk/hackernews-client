import { useEffect } from "react";
import { useAppStore } from "../../stores/AppStore/AppStoreProvider";
import { observer } from "mobx-react-lite";
import { NewsItem } from "./ui/NewsItem";
import { Button, Flex, Skeleton } from "antd";


export const NewsList = observer(() => {
    const { isLoading, news, getNews, newsIds, getNewsIds } = useAppStore()
    useEffect(() => {
        getNewsIds();
        const refreshInterval = setInterval(() => getNewsIds(), 60000);

        return (() => clearInterval(refreshInterval));
    }, [])

    useEffect(() => {
        getNews();
    }, [newsIds])

    const handleClick = ( ) => {
        getNewsIds();
    }

    return (
        <>
        <Button type="primary" onClick={handleClick}>Refresh</Button>
       { news.length && !isLoading ? 
        <Flex vertical>
            {
                news.map((elem) => <NewsItem key={elem.id} id={elem.id} news={elem} />)
            }
        </Flex> : <>
        <Skeleton active={true} loading={isLoading}/>
        <Skeleton active={true} loading={isLoading}/>
        <Skeleton active={true} loading={isLoading}/>
        <Skeleton active={true} loading={isLoading}/>
        <Skeleton active={true} loading={isLoading}/>        
        <Skeleton active={true} loading={isLoading}/>
        </>}
        </>
    )
})