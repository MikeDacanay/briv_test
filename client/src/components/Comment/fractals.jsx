import { Input } from '../UI/Input';
import { useEditableComment } from './customHooks';
export const UpdatableComment = ({contents, editablecomment}) => {
	const [editable] = useEditableComment(editablecomment);

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
        'border': '0px',
        'width': '50%',
        'height': '50px',
		'display': 'inline'
    }

	return (
		<>
			<Input
				name="contents"
				label="Comment:"
				type="textarea"
				defaultValue={contents}
				required
				style={!editable ? nonEditableTitle : editableCss}
				disabled={!editable}
				/>  
		</>
	)
}