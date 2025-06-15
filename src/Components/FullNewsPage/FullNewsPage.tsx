import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

export const FullNewsPage = observer(() => {
    const { id } = useParams();

    return (
        <div>
            <h3>{id}</h3>
        </div>
    );
})