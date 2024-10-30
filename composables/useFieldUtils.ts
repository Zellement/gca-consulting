import FormSelectDropdown from '@/components/Atoms/Forms/FormSelectDropdown.vue'
import FormTextArea from '@/components/Atoms/Forms/FormTextarea.vue'
import FormTextInput from '@/components/Atoms/Forms/FormTextInput.vue'
import FormTelephoneInput from '@/components/Atoms/Forms/FormTelephoneInput.vue'
import FormAdvCheckboxes from '@/components/Molecules/Forms/FormAdvCheckboxes.vue'
import FormRadioButtons from '@/components/Molecules/Forms/FormRadioButtons.vue'
import FormInfoBlock from '@/components/Molecules/Forms/FormInfoBlock.vue'
import FormCheckboxBoolean from '@/components/Atoms/Forms/FormCheckboxBoolean.vue'

export const useFieldUtils = () => {
    /**
     * Creates a map of fields to imports.
     * Used to dynamically render field elements when the field required
     * is not known until runtime.
     */
    interface FieldType {
        [key: string]: Component
    }
    const getFieldMap = () => ({
        FormSelectDropdown: FormSelectDropdown,
        FormTextArea: FormTextArea,
        FormTextInput: FormTextInput,
        FormTelephoneInput: FormTelephoneInput,
        FormAdvCheckboxes: FormAdvCheckboxes,
        FormRadioButtons: FormRadioButtons,
        FormInfoBlock: FormInfoBlock,
        FormCheckboxBoolean: FormCheckboxBoolean
    })

    const formFieldMap = (fieldType: string) => {
        const fieldMap: FieldType = getFieldMap()
        return fieldMap[fieldType]
    }

    return {
        formFieldMap
    }
}
