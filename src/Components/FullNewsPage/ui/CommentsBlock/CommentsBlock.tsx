import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Divider, Flex, Skeleton, Typography } from "antd";
import { useParams } from "react-router-dom";
import { CommentsItem } from "../CommentsItem/CommentsItem";


export const CommentsBlock = observer(() => {
    const [commentsData, setCommentsData] = useState<any[]>([])
    const { id } = useParams();


    const fetchChildren = async (id) => {
        return await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then(res => res.json())
            .then(res => res)
    }

    const fetchKids = async (id) => {
        return await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then(res => res.json())
            .then((res) => Promise.all(res.kids.map((item) => fetchChildren(item))))
            .then(res => res)
    }

    useEffect(() => {
        const fetchData = async () => { setCommentsData(await fetchKids(id)) }
        fetchData()
    }, [id])

    const handleClick = () => {

    }

    const handleLoadComments = (elem) => {
        console.log(elem)
        if (elem.kids) {
            const fetchData = async () => { setCommentsData(await fetchKids(elem.id)) }
            fetchData()
        }
    }

    return (
        <>
            <Button type="primary" onClick={handleClick}>Refresh Comments</Button>
            {commentsData?.length ?
                <Flex vertical>
                    {
                        commentsData.map((elem) => {
                            return (<Flex key={elem.id} id={elem.id} onClick={() => handleLoadComments(elem)} vertical style={{ border: '1px solid #333', textAlign: 'start' }}>
                                <Typography.Text >{elem.text}</Typography.Text>
                                <Flex wrap>
                                    <Typography.Text>Raiting: {elem?.score}</Typography.Text>
                                    <Divider type="vertical" />
                                    <Typography.Text>Author: {elem?.by}</Typography.Text>
                                    <Divider type="vertical" />
                                    <Typography.Text>Comments: {elem?.kids?.length || '0'}</Typography.Text>
                                </Flex>
                            </Flex>)
                        })
                    }
                </Flex> : <>
                    <Skeleton active={true} />
                    <Skeleton active={true} />
                    <Skeleton active={true} />
                    <Skeleton active={true} />
                    <Skeleton active={true} />
                    <Skeleton active={true} />
                </>}
        </>
    )
})