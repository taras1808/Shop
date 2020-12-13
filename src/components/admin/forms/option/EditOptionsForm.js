import '../ProductForm.css';
import OptionsTree from './tree/OptionsTree'


export default function EditOptionsForm() {

    return (
        <div className="admin-panel-form">
            <h2>Edit options</h2>
            <OptionsTree />
        </div>
    );
}
