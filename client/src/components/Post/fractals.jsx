import { useEditablePost } from './customHook';
import { Input } from '../UI/Input';

export const UpdatablePost = ({editablepost, title, body, display_name, createdAt}) => {
    const [editable] = useEditablePost(editablepost);
    const editableCss = {
        'display': 'flex',
        'border': '1px inset #333',
        'borderRadius': '2px',
        'width': '50%',
        'height': '100px'
    }

    const nonEditableTitle = {
        'cursor': 'default',
        'backgroundColor': 'transparent',
        'color': 'black',
        'border': '1px solid black',
        'width': '50%',
        'height': '40px'
    }

    const nonEditableBody = {
        'cursor': 'default',
        'backgroundColor': 'transparent',
        'color': 'black',
        'border': '1px solid black',
        'width': '50%',
        'height': '100px'
    }

    return (
        <>
            <Input
                name="title"
                label="Title"
                type="text"
                defaultValue={title}
                required
                style={!editable ? nonEditableTitle : editableCss}
                disabled={!editable}
                placeholder='Enter Title Here'/>  
            <Input
                name="body"
                label="Post"
                type="textarea"
                defaultValue={body}
                style={!editable ? nonEditableBody : editableCss}
                disabled={!editable}
                variant='textarea-0'
                required
                placeholder='Enter Post Here'/>
                
            {/* <div className="" style={{'dislplay': 'flex'}}> */}
            <div className="">Created By: {display_name}</div>
            <div className="">Created On: {createdAt}</div>
                {/* <div className="">{display_name}</div> */}
            {/* </div> */}
        </>
    );
}