// Configuration scene component for handling various input types based on prompt configuration
import type { FC } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  PlayIcon,
} from '@heroicons/react/24/solid'
import Select from '@/app/components/base/select'
import type { PromptConfig } from '@/types/app'
import Button from '@/app/components/base/button'
import { DEFAULT_VALUE_MAX_LEN } from '@/config'

// Component props interface
export type IConfigSenceProps = {
  promptConfig: PromptConfig // Configuration for the prompt variables
  inputs: Record<string, any> // Current input values
  onInputsChange: (inputs: Record<string, any>) => void // Callback when inputs change
  onSend: () => void // Callback when send button is clicked
}
// Main configuration scene component
const ConfigSence: FC<IConfigSenceProps> = ({
  promptConfig, // Prompt configuration from props
  inputs, // Current input values from props
  onInputsChange, // Input change handler from props
  onSend, // Send handler from props
}) => {
  const { t } = useTranslation()

  // Clear all input fields to their default empty values
  const onClear = () => {
    const newInputs: Record<string, any> = {}
    promptConfig.prompt_variables.forEach((item) => {
      newInputs[item.key] = ''
    })
    onInputsChange(newInputs)
  }

  return (
    <div className="">
      <section>
        {/* input form */}
        <form>
          {/* Render different input types based on prompt configuration */}
          {promptConfig.prompt_variables.map(item => (
            // Hide input field if variable name ends with "_hidden" but still process the data
            <div className={`w-full mt-4 ${item.key.endsWith('_hidden') ? 'hidden' : ''}`} key={item.key}>
              {/* Show label only for visible fields */}
              {!item.key.endsWith('_hidden') && (
                <label className='text-gray-900 text-sm font-medium'>{item.name}</label>
              )}
              <div className='mt-2'>
                {/* Select input type */}
                {item.type === 'select' && (
                  <Select
                    className='w-full'
                    defaultValue={inputs[item.key]}
                    onSelect={(i) => { onInputsChange({ ...inputs, [item.key]: i.value }) }}
                    items={(item.options || []).map(i => ({ name: i, value: i }))}
                    allowSearch={false}
                    bgClassName='bg-gray-50'
                  />
                )}
                {/* Text input type */}
                {item.type === 'string' && (
                  <input
                    type="text"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
                    placeholder={`${item.name}${!item.required ? `(${t('app.common.optional')})` : ''}`}
                    value={inputs[item.key]}
                    onChange={(e) => { onInputsChange({ ...inputs, [item.key]: e.target.value }) }}
                    maxLength={item.max_length || DEFAULT_VALUE_MAX_LEN}
                  />
                )}
                {/* Textarea input type */}
                {item.type === 'paragraph' && (
                  <textarea
                    className="block w-full h-[104px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
                    placeholder={`${item.name}${!item.required ? `(${t('app.common.optional')})` : ''}`}
                    value={inputs[item.key]}
                    onChange={(e) => { onInputsChange({ ...inputs, [item.key]: e.target.value }) }}
                  />
                )}
                {/* Number input type */}
                {item.type === 'number' && (
                  <input
                    type="number"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
                    placeholder={`${item.name}${!item.required ? `(${t('appDebug.variableTable.optional')})` : ''}`}
                    value={inputs[item.key]}
                    onChange={(e) => { onInputsChange({ ...inputs, [item.key]: e.target.value }) }}
                  />
                )}
              </div>
            </div>
          ))}

          {promptConfig.prompt_variables.length > 0 && (
            <div className='mt-6 h-[1px] bg-gray-100'></div>
          )}
          <div className='w-full mt-4'>
            <div className="flex items-center justify-between">
              {/* Clear button to reset all inputs */}
              <Button
                className='!h-8 !p-3'
                onClick={onClear}
                disabled={false}
              >
                <span className='text-[13px]'>{t('common.operation.clear')}</span>
              </Button>
              {/* Send button to trigger the onSend callback */}
              <Button
                type="primary"
                className='!h-8 !pl-3 !pr-4'
                onClick={onSend}
                disabled={false}
              >
                <PlayIcon className="shrink-0 w-4 h-4 mr-1" aria-hidden="true" />
                <span className='text-[13px]'>{t('app.generation.run')}</span>
              </Button>
            </div>
          </div>
        </form>
      </section>
    </div>
  )
}
export default React.memo(ConfigSence)
