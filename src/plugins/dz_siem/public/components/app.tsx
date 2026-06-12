import React from 'react';
import {
  EuiPage, EuiPageBody, EuiPageHeader, EuiPageContent, EuiTitle, EuiText,
  EuiFlexGroup, EuiFlexItem, EuiStat,
} from '@elastic/eui';

export const DzSiemApp: React.FC = () => {
  return (
    <EuiPage>
      <EuiPageBody>
        <EuiPageHeader pageTitle="منصة SIEM الجزائرية / DZ SIEM Platform" />
        <EuiPageContent>
          <EuiFlexGroup>
            <EuiFlexItem>
              <EuiStat title="1,247" description="الأحداث الأمنية اليوم / Security Events Today" />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiStat title="3" description="تنبيهات حرجة / Critical Alerts" color="danger" />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiStat title="98.2%" description="امتثال ANSSI-DZ / Compliance Score" color="success" />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiStat title="847" description="مضيفون مراقبون / Monitored Hosts" />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiText>
            <p>ObservaBoard DZ SIEM — Powered by OpenSearch k-NN + VectorLog-Engine semantic anomaly detection.</p>
          </EuiText>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};
