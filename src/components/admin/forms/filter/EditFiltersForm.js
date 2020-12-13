import '../ProductForm.css';
import FilterTree from './tree/FilterTree'


export default function EditFiltersForm() {

    return (
        <div className="admin-panel-form">
            <h2>Edit filters</h2>
            <FilterTree />
        </div>
    );
}
