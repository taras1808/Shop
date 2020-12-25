import '../AdminPanelForm.css';
import FiltersTree from './tree/FiltersTree'


export default function EditFiltersForm() {

    return (
        <div className="admin-panel-form">
            <h2 className="admin-panel-title">Edit filters</h2>
            <FiltersTree />
        </div>
    );
}
